//import { useEffect, useState } from "react";
import Container from "@/components-ui/layout/container";
import Navbar from "@/components-ui/layout/navbar";
import TablePedido from "@/components-ui/registry/table-pedido";
import EditableTable from "@/components-ui/registry/editable-table";
import { produtoService } from "@app/api/server/produto-service";

export default async function Pedido() {
    return (
        <div>
            <Navbar />
            <Container customClass="min-height">
                <EditableTable />
            </Container>
        </div>
    )
}