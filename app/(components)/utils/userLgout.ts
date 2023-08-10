import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Swal from "sweetalert2";

export async function UserLogOut() {
  const { logout } = useContext(AuthContext);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      logout();
      await Swal.fire({
        title: "Success!",
        text: `${data?.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (err) {
    await Swal.fire({
      title: "Error!",
      text: `${err}`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}
