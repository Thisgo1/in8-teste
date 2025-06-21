// src/hooks/useAuth.ts
import { api } from "@/services/api";
import { useState } from "react";

export const useAuth = () => {
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const login = async (email: string, password: string): Promise<boolean> => {
		setIsLoading(true);
		setError(null);

		try {
			const data = await api.auth.signin({ email, password });

			// Verifique a estrutura da resposta do seu backend
			// Normalmente o token vem em uma propriedade 'accessToken' ou 'token'
			const accessToken = data.access_token || data.token;

			if (!accessToken) {
				throw new Error("Token não recebido na resposta");
			}

			setToken(accessToken);
			localStorage.setItem("token", accessToken);
			setIsLoading(false);
			return true;
		} catch (err: any) {
			let errorMessage = "Erro ao fazer login";

			if (err.response?.data?.message) {
				errorMessage = err.response.data.message;
			} else if (err.message) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			setIsLoading(false);
			return false;
		}
	};

	const logout = async () => {
		try {
			await api.auth.logout();
			setToken(null);
			localStorage.removeItem("token");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return { token, login, logout, isLoading, error };
};
