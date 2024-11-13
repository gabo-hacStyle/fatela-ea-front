
type Props = {
    params: {
        country: string
    }
}

const page = async ({params}: Props) => {
    const {country} = await params;
    console.log('country', country);
    return (
    <div>Bienvenido coordinador de: {country}</div>
  )
}

export default page