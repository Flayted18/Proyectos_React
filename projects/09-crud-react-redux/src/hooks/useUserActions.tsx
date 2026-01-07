import { addNewUser, deleteUserById, updateUser, type User, type UserId, type UserWithId } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {

  const dispatch = useAppDispatch();

  const addUser = ({name, email, github}: User) => {
    dispatch(addNewUser({name, email, github}))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const editUser = (user:UserWithId) => {
    dispatch(updateUser(user))
  }

  return { addUser, removeUser, editUser}
}
