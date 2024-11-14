'use client'
import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import UsersForm from './UsersForm'
import CreateTabs from './CreateTabs'
import { Country, User } from '@/index'
//internacionalizacion
import {useTranslations} from 'next-intl';
import { handleDeleteUser } from '@/actions/userActions'

interface UserDialogProps {
  usage: 'add' | 'edit' | 'delete'
  user: User | null;
  countries: Country[];
}


const UserDialog = ({usage, user, countries}: UserDialogProps) => {
  const t = useTranslations('AdminPage');
  

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const clickDeleteHandler = async () => {
    if (user) {
      const response = await handleDeleteUser(user.userId);
      if (response === true) {
        setDeleteSuccess(true);
      }
    }
  };

  return (
    <>
    {(usage === 'add' || usage === 'edit') && (
      <Dialog>
        {
          usage === 'add' ? (
            <DialogTrigger >
              <Button>
              <span className='hidden md:inline-block'>
                     {t('btnNewuser')}
                    </span>
                    +

              </Button>
             
                    
                  
            </DialogTrigger>
          ) : (
            <DialogTrigger >
              <Button variant='secondary' className='flex items-center gap-2'>
                <Edit />
                {t('edit')}
              </Button>
            </DialogTrigger>
           
          )
        }
      
      
        {
          usage === 'edit' ? (
            <DialogContent>
          <DialogHeader>
            {user && (<DialogTitle> {t('editUserTitle')} {user.email}</DialogTitle>)}
                    
                  </DialogHeader>
                  <UsersForm user={user} usage='edit' countries={countries} />
                </DialogContent>
          ) : (
            <DialogContent>
            <DialogHeader>
          <DialogTitle>{t('newUsertitle')}</DialogTitle>
        </DialogHeader>

           <CreateTabs countries={countries} user={null}/>
      </DialogContent>
          )
        }
        
    </Dialog>
    )

    }
    {
      usage === 'delete' && (
        <AlertDialog>
        <AlertDialogTrigger>
          <Button variant='destructive' className='flex items-center gap-2'>
            <Trash2 />
            {t('delete')}
          
          </Button>
          </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteWarn')} {user?.email} ?</AlertDialogTitle>
            
            
            
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={() => clickDeleteHandler()}>{t('save')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      )
    }

    </>
    
  )
}

export default UserDialog