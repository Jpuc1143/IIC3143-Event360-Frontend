import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
/* import { useMutation, useQueryClient } from "react-query"; */
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { postRequest } from "../api/queries";

type FormData = {
  name: string;
  organization: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  merchantCode: string;
};

const formDataSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  organization: z.string().min(1, "La organización es requerida"),
  description: z.string().min(10, "La descripción es requerida"),
  eventType: z.string().min(1, "El tipo de evento es requerido"),
  startDate: z.string().refine((datetime) => !/^\s+$/.test(datetime), {
    message: "Fecha y hora de inicio inválida",
  }),
  endDate: z.string().refine((datetime) => !/^\s+$/.test(datetime), {
    message: "Fecha y hora de término inválida",
  }),
  location: z.string().min(1, "La ubicación es requerida"),
  image: z
    .string()
    .min(1, "La imagen es requerida")
    .refine((image) => !/^\s+$/.test(image), { message: "Link inválido" }),
});

export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const createEvent = async (newEvent: FormData) => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await postRequest("/events", newEvent, accessToken);
    if (data) {
      toast.success("Evento creado exitosamente");
      navigate("/my-organized-events");
    } else {
      toast.error("Hubo un error al crear el evento");
    }
  };

  const onSubmit = (data: FormData) => {
    try {
      data.merchantCode = "0";
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
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="mx-32 my-6 flex flex-col items-center">
      <h1 className="text-primary font-bold text-4xl">Crea un nuevo Evento!</h1>
      <form
        className="flex flex-col gap-4 my-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Nombre del Evento</label>
          <input
            {...register("name")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Organización</label>
          <input
            {...register("organization")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
            placeholder="Ej: DCC"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Descripción</label>
          <input
            {...register("description")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Tipo de evento</label>
          <select
            {...register("eventType")}
            id="event_type"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
          >
            <option>Elige una modalidad</option>
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
            <option value="hybrid">Híbrido</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">
            Fecha y Hora de Inicio
          </label>
          <input
            {...register("startDate")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
            placeholder={`Ej: ${currentDate} 17:00`}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">
            Fecha y Hora de Término
          </label>
          <input
            {...register("endDate")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
            placeholder={`Ej: ${currentDate} 20:00`}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Ubicación</label>
          <input
            {...register("location")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary"
            type="text"
            placeholder="Ej: Patio de Ingeniería"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">Imagen del Evento</label>
          <input
            {...register("image")}
            type="text"
            id="image"
            placeholder="Inserta la URL de la imagen"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
          <span style={{ display: "block", minHeight: "20px" }}>
            {errors.image && String(errors.image.message)}
          </span>
          {watch("image") && (
            <div className="mt-4">
              <img
                src={watch("image")}
                alt="Vista previa"
                className="w-full rounded-md shadow-lg max-h-64"
              />
            </div>
          )}
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
