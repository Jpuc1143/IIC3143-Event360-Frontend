import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
/* import { useMutation, useQueryClient } from "react-query"; */
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { postRequest } from "../api/queries";
import { useParams } from "react-router";

type FormData = {
  eventId: undefined | string;
  // name: string;
  price: number;
  amount: number;
  domainWhitelist: string;
};

const formDataSchema = z.object({
  // name: z.string().min(1, "El nombre es requerido"),
  price: z.coerce.number().min(1, "El precio por ticket es requerido"),
  amount: z.coerce.number().min(1, "La cantidad de tickets es requerida"),
  domainWhiteList: z
  .union([z.string().length(0), z.string().min(4)])
  .optional()
  .transform(e => e === "" ? undefined : e),
});

export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // watch,
  } = useForm<FormData>();
  const EventId = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const createEvent = async (newEvent: FormData) => {
    const accessToken = await getAccessTokenSilently();
    newEvent.eventId = EventId.id;
    console.log(newEvent)
    const { data } = await postRequest("/tickettypes", newEvent, accessToken); // TODO: Cambiar a endpoint correcto
    if (data) {
      toast.success("Tipo de ticket creado exitosamente");
      navigate(`/view-event/${EventId.id}`);
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
      <h1 className="text-primary font-bold text-4xl">Agrega un nuevo tipo de ticket</h1>
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
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">
            Cantidad de tickets disponibles
          </label>
          <input
            {...register("amount")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">
            Añadir dominios permitidos
          </label>
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
