import { useState, useEffect } from 'react';
import Select from 'react-select';
import { getCountryByName } from '../../api/apiService';

interface CountryData {
  id?: string;
  name: string;
  fullName: string;
  flag: string;
}

class Country {
  id: string | undefined = '';
  name: string = '';
  fullName: string = '';
  flag: string = '';

  constructor(id: string, name: string, fullName: string, flag: string) {
    this.id = id;
    this.name = name;
    this.fullName = fullName;
    this.flag = flag;
  }
}

interface Props {
  maxOptions: number;
}

const AutocompleteControl = ({ maxOptions }: Props) => {
  const [text, setText] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const fetchCountries = async () => {
    const response: CountryData[] = await getCountryByName(text);
    const countries: Country[] = response.map(
      (item: CountryData) => new Country(item.id  || '', item.name, item.fullName, item.flag)
    );
    setCountries(countries);
  };

  useEffect(() => {
  if (text) {
    fetchCountries();
  } else {
    setCountries([]);
  }
  
  if (!selectedCountry) {
    setText('');
  }
}, [text, selectedCountry]);

  const options = countries
    .slice(0, maxOptions)
    .map((country: Country) => ({
      label: `${country.fullName} (${country.name})`,
      value: country,
    }));

  const onTextChange = (value: string) => {
    setText(value);
    setSelectedCountry(null);
  };

  const onCountrySelect = (option: any) => {
    const selectedOption = option as { label: string; value: Country };
    setSelectedCountry(selectedOption ? selectedOption.value : null);
    setText(selectedOption ? selectedOption.value.fullName : '');
  };

  return (
    <div>
      <Select
        className='select'
        options={options}
        value={selectedCountry ? { label: selectedCountry.fullName, value: selectedCountry } : null}
        onChange={onCountrySelect}
        onInputChange={onTextChange}
      />
    </div>
  );
};

export default AutocompleteControl;