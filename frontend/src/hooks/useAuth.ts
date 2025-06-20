import { api } from "@/services/api";
import { useState } from "react";

export const useAuth = () => {
	const [token, setToken] = useState<string | null>(null);

	const login = async (email: string, password: string) => {
		const data = await api.auth.signin({ email, password });
		setToken(data.accessToken);
	};

	const logout = async () => {
		await api.auth.logout();
		setToken(null);
	};

	return { token, login, logout };
};
