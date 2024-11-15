import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { handleGetCountries, handleGetPrograms } from '@/actions/catalogsActions';
import { Country, Program } from '@/index';


interface Props {
    type: 'program' | 'year' | 'country' ;
    field: any;
 
}

const SelectItems =  ({field, type}: Props) => {
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        const fetchData = async () => {
            switch (type) {
                case 'program':
                    const programs = await handleGetPrograms();
                    if(programs) {
                        setData(programs)
                    }
                    break;
                case 'year':
                    
                    const years = Array.from({ length: 2024 - 1990 + 1 }, (_, i) => 1990 + i);
                    setData(years);
                    break;
                case 'country':
                    const countries = await handleGetCountries();
                    if(countries) {
                        setData(countries)
                    }
                    break;
                default:
                    break;
            }
        }
        fetchData()
    }, [])


    const renderSelectItems = () => {
        if (type === 'program' ) {
          return data.map((program: Program, index: number) => (
            <SelectItem key={index} value={program.programCode}>
              {program.name}
            </SelectItem>
          ));
        } else if (type === 'year' ) {
          return data.map((year: number,) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ));
        } else if (type === 'country' ) {
          return data.map((country: Country, index: number) => (
            <SelectItem key={index} value={String(country.countryId)}>
              {country.countryName}
            </SelectItem>
          ));
        }
        return null;
      };

  return (
    <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`Select ${type}`} />
                </SelectTrigger>
                <SelectContent>
                  {renderSelectItems()}
                </SelectContent>
              </Select>
  )
}

export default SelectItems