'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

import { deleteCookie } from '@/utils/cookiesManager';
import { useUpdateInfo } from '@/hooks/useUpdateInfo';

type LogoutButtonProps = {
    position: 'top' | 'sidebar'        
}

const LogoutButton = ({position}: LogoutButtonProps) => {
    const { setCountryId, setMode, setQuery } = useUpdateInfo();
    const router = useRouter();

    async function handleLogout() {
        
        deleteCookie('token');
        deleteCookie('user');
        router.push('/');
        setCountryId(null);
        setMode(null);
        setQuery('');
    }

  return (
    <Button
                onClick={handleLogout}
                variant="outline"  
                >
                    Log out
                </Button>
  )
}

export default LogoutButton