import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
/* import { useMutation, useQueryClient } from "react-query"; */
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { postRequest } from "../api/queries";
 
type FormData = {
  // event_id: string;
  // name: string;
  price: number;
  amount: number;
  domainWhitelist: string;
};

const formDataSchema = z.object({
  // event_id: z.string().min(1, "El id del evento es requerido"),
  // name: z.string().min(1, "El nombre es requerido"),
  price: z.number().int().min(1, "El precio por ticket es requerido"),
  amount: z.number().int().min(1, "La cantidad de tickets es requerida"),
  domainWhiteList: z.string()
});

export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // watch,
  } = useForm<FormData>();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const createEvent = async (newEvent: FormData) => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await postRequest("/tickettype", newEvent, accessToken); // TODO: Cambiar a endpoint correcto
    if (data) {
      toast.success("Tipo de ticket creado exitosamente");
      navigate(`/view-events/${data.event_id}`);
    } else {
      toast.error("Hubo un error al crear el evento");
    }
  };

  const onSubmit = (data: FormData) => {
    try {
      formDataSchema.parse(data);
      console.log(data);
      createEvent(data);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        error.errors.forEach((errorDetail) => {
          toast.error(errorDetail.message);
        });
      } else {
        toast.error("Error inesperado al procesar el formulario");
      }
    }
  };

  return (
    <div className="mx-32 my-6 flex flex-col items-center">
      <h1 className="text-primary font-bold text-4xl">Crea un nuevo Evento!</h1>
      <form
        className="flex flex-col gap-4 my-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Precio</label>
          <input
            {...register("price")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
          />
        </div><div className="flex flex-col">
          <label className="text-primary-dark text-lg">Cantidad de tickets disponibles</label>
          <input
            {...register("price")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Añadir dominions permitidos</label>
          <input
            {...register("domainWhitelist")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
          />
        </div>
        <div className="flex flex-row gap-6 justify-betweeen">
          <button
            className="bg-secondary text-white font-bold text-lg rounded-full px-5 py-2"
            type="submit"
          >
            Crear Evento
          </button>
          <button
            className="bg-slate-400 text-white font-bold text-lg rounded-full px-5 py-2"
            type="button"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
