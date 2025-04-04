import dynamic from 'next/dynamic';


const DynamicWrapper: React.FC = (dynamicComponent) => {

    const ComponenteCarregado = dynamic(dynamicComponent, {
        loading: false || (() => <p>Carregando...</p>),
    });

    return <ComponenteCarregado />;
}


export default DynamicWrapper;