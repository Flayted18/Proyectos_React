
export const fetchUsers = async (page: number) => {
    return await fetch(`https://randomuser.me/api?results=10&seed=flayted18&page=${page}`)
        .then(res => {
            if (!res.ok) throw new Error('Error al cargar los usuarios')
            return res.json()
        })
        .then(res => {
            return {
                users: res.results,
                nextCursor: res.info.page + 1,
            }
        })
}