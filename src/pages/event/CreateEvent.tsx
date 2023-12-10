import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
/* import { useMutation, useQueryClient } from "react-query"; */
import { useNavigate } from "react-router";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { postRequest } from "../../api/queries";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

type FormData = {
  name: string;
  organization: string;
  description: string;
  eventType: string;
  startDate: Dayjs;
  endDate: Dayjs;
  location: string;
  image: string;
  merchantCode: string;
};

const formDataSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    organization: z.string().min(1, "La organización es requerida"),
    description: z.string().min(10, "La descripción es requerida"),
    eventType: z.string().min(1, "El tipo de evento es requerido"),
    startDate: z.date({
      errorMap: (issue, ctx) =>
        issue.code === z.ZodIssueCode.invalid_date
          ? { message: "Fecha y hora de inicio inválida" }
          : { message: ctx.defaultError },
      coerce: true,
    }),
    endDate: z.date({
      errorMap: (issue, ctx) =>
        issue.code === z.ZodIssueCode.invalid_date
          ? { message: "Fecha y hora de término inválida" }
          : { message: ctx.defaultError },
      coerce: true,
    }),
    location: z.string().min(1, "La ubicación es requerida"),
    image: z
      .string()
      .min(1, "La imagen es requerida")
      .refine((image) => !/^\s+$/.test(image), { message: "Link inválido" }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "La fecha y hora de inicio debe ser anterior a la de término",
    path: ["startDate", "endDate"],
  });

function CreateEvent() {
  const {
    register,
    control,
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
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => {
              return (
                <DateTimePicker
                  format="DD/MM/YYYY HH:mm A"
                  onChange={(date) => field.onChange(date)}
                  disablePast
                  slotProps={{ textField: { size: "small" } }}
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-primary-dark text-lg">
            Fecha y Hora de Término
          </label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => {
              return (
                <DateTimePicker
                  format="DD/MM/YYYY HH:mm A"
                  onChange={(date) => field.onChange(date)}
                  disablePast
                  slotProps={{
                    textField: {
                      size: "small",
                      className: "rounded-lg",
                    },
                  }}
                />
              );
            }}
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
                className="w-64 rounded-md shadow-lg max-h-64"
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

export default withAuthenticationRequired(CreateEvent);
