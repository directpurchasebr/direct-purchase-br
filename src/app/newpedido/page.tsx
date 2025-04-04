import Container from "@/components/layout/container";
import Navbar from "@/components/layout/navbar";
import TablePedido from "@/components/registry/table-pedido";

const Pedido: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Container customClass="min-height">
                <TablePedido />
            </Container>
        </div>
    )
}

export default Pedido;