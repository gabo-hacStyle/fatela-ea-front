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

import { useUpdateInfo } from '@/hooks/useUpdateInfo';
import { useTranslations } from 'next-intl';


interface Props {
    type: 'program' | 'year' | 'country' ;
    field: any;
 
}

const SelectItems =  ({field, type}: Props) => {
    const t = useTranslations('staffPage'); 
    const { setCoursesInProgram, setYearSelected } = useUpdateInfo();
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
                    
                    const years = Array.from({ length: 2024 - 1998 + 1 }, (_, i) => 2024 - i);
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

    const handleSelectChange = (value: string) => {
      field.onChange(value);
      if (type === 'program') {
        const selectedProgram = data.find((program: Program) => program.name === value);
        setCoursesInProgram({ active: true, total: selectedProgram.courses.length });
      } else if (type === 'year') {
        setYearSelected({ selected: true, year: Number(value) });
      }
    };


    const renderSelectItems = () => {
        if (type === 'program' ) {
          return data.map((program: Program, index: number) => (
            <SelectItem key={index} value={program.name}  >
              {program.name}
            </SelectItem>
          ));
        } else if (type === 'year' ) {
          return data.map((year: number,) => (
            <SelectItem key={year} value={String(year)} >
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
    <Select  defaultValue={field.value} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`${t('select')} ${type}`} />
                </SelectTrigger>
                <SelectContent >
                  {renderSelectItems()}
                </SelectContent>
              </Select>
  )
}

export default SelectItems