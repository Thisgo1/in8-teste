import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { getToken } from "@/lib/auth";

export const useUserOrders = () => {
	const [orders, setOrders] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = getToken();
				if (!token) {
					setLoading(false);
					return;
				}

				const ordersData = await api.orders.getAll(token);
				console.log("Pedidos recebidos:", ordersData); // Para depuração
				setOrders(ordersData);
			} catch (err) {
				setError("Erro ao carregar pedidos");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	return { orders, loading, error };
};
