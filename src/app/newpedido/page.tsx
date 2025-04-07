import Container from "@components/layout/container";
import Navbar from "@components/layout/navbar";
import TabelaPedidos from "@components/tabela-pedido/tabela-pedido";

export default async function Pedido() {
    return (
        <div>
            <Navbar />
            <Container customClass="min-height">
                <TabelaPedidos />
            </Container>
        </div>
    )
}