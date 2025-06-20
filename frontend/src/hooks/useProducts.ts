import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "@/services/api";
import { UnifiedProduct } from "@/types/types";

export const useProducts = () => {
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Função principal para buscar produtos
  const fetchProducts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      if (reset) {
        setPage(1);
        setHasMore(true);
      }
      
      const data = await api.providers.getAll();
      setProducts(data);
      setError(null);
      
      // Simulação de paginação - em caso real, a API retornaria paginação
      setHasMore(data.length > 0 && data.length >= page * 20);
      
    } catch (err) {
      setError("Falha ao carregar produtos. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Função de busca
  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      fetchProducts(true);
      return;
    }

    try {
      setLoading(true);
      // Filtragem local - em caso real seria uma API de busca
      const filtered = products.filter(
        p => p.name.toLowerCase().includes(query.toLowerCase()) || 
             (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      );
      
      setProducts(filtered);
      setError(filtered.length === 0 ? "Nenhum produto encontrado" : null);
    } catch (err) {
      setError("Erro na busca");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [products, fetchProducts]);

  // Carregar mais produtos (pagination)
  const loadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  // Obter produtos para carrosséis
  const getNewProducts = useMemo(() => {
    return products.slice(0, 5);
  }, [products]);

  const getBestSellingProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
      .slice(0, 5);
  }, [products]);

  // Carregar produtos inicialmente
  useEffect(() => {
    fetchProducts(true);
  }, []);

  return {
    products,
    loading,
    error,
    newProducts: getNewProducts,
    bestSellingProducts: getBestSellingProducts,
    hasMore,
    
    // Ações
    refetch: () => fetchProducts(true),
    search: searchProducts,
    loadMore
  };
};
