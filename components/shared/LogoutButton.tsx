'use client';

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

import { deleteCookie } from '@/utils/cookiesManager';

type LogoutButtonProps = {
    position: 'top' | 'sidebar'        
}

const LogoutButton = ({position}: LogoutButtonProps) => {
    const router = useRouter();

    async function handleLogout() {
        deleteCookie('token');
        router.push('/');
    }

  return (
    <Button
                onClick={handleLogout}
                className={`absolute right-7 top-10`}
                >
                    Log out
                </Button>
  )
}

export default LogoutButton