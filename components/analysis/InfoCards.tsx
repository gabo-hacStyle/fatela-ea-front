'use client';
import React from 'react'

interface InfoCardsProps {
  type: string;
  data: number;

}

const InfoCards = ({data}: InfoCardsProps) => {
  return (
    <>
    <p>
      {data}
    </p>
    </>
  )
}

export default InfoCards