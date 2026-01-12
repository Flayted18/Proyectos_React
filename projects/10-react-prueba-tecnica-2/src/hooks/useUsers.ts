import { useInfiniteQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import type { User } from "../types.d";
import { useMemo } from "react";


export const useUsers = () => {
    const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor: number, users: User[] }>({
        queryKey: ['users'],
        queryFn: ({ pageParam }: { pageParam: unknown }) => fetchUsers(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: Infinity

    })

    // useQueryClient nos da acceso al cliente de React Query para manipular la caché
    const queryClient = useQueryClient()

    const users = useMemo(() => {
        return data?.pages.flatMap(page => page.users) ?? []
    }, [data])

    const removeUser = (id: string) => {
        // setQueryData permite actualizar manualmente la caché de React Query
        // 'InfiniteData' es el tipo de dato que espera React Query para queries infinitas
        queryClient.setQueryData<InfiniteData<{ nextCursor: number; users: User[] }>>(['users'], (oldData) => {
            if (!oldData) return undefined

            // Devolvemos un nuevo objeto con los datos actualizados (inmutabilidad)
            return {
                ...oldData,
                // Recorremos todas las páginas (pages) que ya se han cargado
                pages: oldData.pages.map(page => ({
                    ...page,
                    // En cada página, filtramos para quitar al usuario que queremos borrar
                    users: page.users.filter(user =>
                        // Usamos la misma lógica de comparación de ID que tenías antes
                        user.id.value === null ? user.login.uuid !== id : user.id.value !== id
                    )
                }))
            }
        })
    }

    return {
        users,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        removeUser
    }
}