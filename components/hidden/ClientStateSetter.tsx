'use client';
import { useUpdateInfo } from '@/hooks/useUpdateInfo';

import React, {useEffect} from 'react'


interface Props {
    countryId: number | null;
    mode: 'staff' | 'coord';
}

const ClientStateSetter = ({countryId, mode}: Props) => {
    const  {setCountryId, setMode, setQuery} = useUpdateInfo();

    useEffect(() => {
      console.log('Llegando aca mamahuevo')
        setCountryId(countryId);
        setMode(mode);
        setQuery('');
    }, [])

  return (
    <></>
  )
}

export default ClientStateSetter