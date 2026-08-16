import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import axios from "axios";
import type { ZodIssue } from "zod";
import type { ContactInfo, ContactSocialLink, ContactSocialType } from "../../domain/contact.types";
import { contactInfoValidation } from "../../domain/contactInfo.validation";
import { hasContactInfoChanges } from "../../domain/contactChangeDetection";

// imports Leaflet
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (
  L.Icon.Default.prototype as L.Icon.Default & {
    _getIconUrl?: () => string;
  }
)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const numberInputSx = {
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

export type ContactInfoTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: ContactInfo;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: ContactInfo) => Promise<void>;
};

type ContactInfoErrors = {
  address?: string;
  businessHours?: string;
  latitud?: string;
  longitud?: string;
  phones?: { value?: string }[];
  emails?: { value?: string }[];
  socialLinks?: { url?: string }[];
};

function mapZodIssuesToErrors(issues: ZodIssue[]): ContactInfoErrors {
  const errors: ContactInfoErrors = {};
  for (const issue of issues) {
    const path = issue.path;
    if (path[0] === "address") errors.address = issue.message;
    if (path[0] === "businessHours") errors.businessHours = issue.message;
    if (path[0] === "latitud") errors.latitud = issue.message;
    if (path[0] === "longitud") errors.longitud = issue.message;
    if (path[0] === "phones" && typeof path[1] === "number") {
      const index = path[1];
      errors.phones ??= [];
      errors.phones[index] = { value: issue.message };
    }
    if (path[0] === "emails" && typeof path[1] === "number") {
      const index = path[1];
      errors.emails ??= [];
      errors.emails[index] = { value: issue.message };
    }
    if (path[0] === "socialLinks" && typeof path[1] === "number") {
      const index = path[1];
      errors.socialLinks ??= [];
      errors.socialLinks[index] = { url: issue.message };
    }
  }
  return errors;
}

// Leaflet -> para manejar clics y eventos de arrastre en el marcador del mapa
function LocationMarker({ position, setPosition }: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) {
  const map = useMap();
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend(e) {
          const marker = e.target;
          const pos = marker.getLatLng();
          setPosition([pos.lat, pos.lng]);
        },
      }}
    />
  );
}

// Leaflet -> para centrar el mapa cuando cambian las coordenadas
function ChangeMapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const ContactInfoTab = forwardRef<ContactInfoTabHandle, Props>(
  function ContactInfoTab({ initialValue, onChanges, onCommitSave }, ref) {
    const [data, setData] = useState<ContactInfo>(initialValue);
    const [errors, setErrors] = useState<ContactInfoErrors>({});
    const [saveError, setSaveError] = useState("");

    useEffect(() => {
      setData(initialValue);
      setErrors({});
      setSaveError("");
    }, [initialValue]);

    const changes = useMemo(
      () => hasContactInfoChanges(data, initialValue),
      [data, initialValue]
    );

    useEffect(() => {
      onChanges(changes);
    }, [changes, onChanges]);

    const cleanErrors = () => {
      setErrors({});
      setSaveError("");
    };

    const handleChange = <K extends keyof ContactInfo>(field: K, value: ContactInfo[K]) => {
      setData((prev) => ({
        ...prev,
        [field]: value,
      }));
      cleanErrors();
    };

    const updatePhone = (index: number, value: string) => {
      setData((prev) => ({
        ...prev,
        phones: prev.phones.map((phone, currentIndex) =>
          currentIndex === index ? { ...phone, value } : phone
        ),
      }));
      cleanErrors();
    };

    const addPhone = () => {
      setData((prev) => ({
        ...prev,
        phones: [
          ...prev.phones,
          {
            id: null,
            value: "",
            isPrimary: false,
            order: prev.phones.length + 1,
          },
        ],
      }));
      cleanErrors();
    };

    const removePhone = (index: number) => {
      setData((prev) => {
        if (prev.phones.length === 1) return prev;

        const nextPhones = prev.phones
          .filter((_, currentIndex) => currentIndex !== index)
          .map((phone, currentIndex) => ({
            ...phone,
            order: currentIndex + 1,
          }));

        if (!nextPhones.some((phone) => phone.isPrimary)) {
          nextPhones[0].isPrimary = true;
        }

        return {
          ...prev,
          phones: nextPhones,
        };
      });

      cleanErrors();
    };

    const setPrimaryPhone = (index: number) => {
      setData((prev) => ({
        ...prev,
        phones: prev.phones.map((phone, currentIndex) => ({
          ...phone,
          isPrimary: currentIndex === index,
        })),
      }));
      cleanErrors();
    };

    const updateEmail = (index: number, value: string) => {
      setData((prev) => ({
        ...prev,
        emails: prev.emails.map((email, currentIndex) =>
          currentIndex === index ? { ...email, value } : email
        ),
      }));
      cleanErrors();
    };

    const addEmail = () => {
      setData((prev) => ({
        ...prev,
        emails: [
          ...prev.emails,
          {
            id: null,
            value: "",
            isPrimary: false,
            order: prev.emails.length + 1,
          },
        ],
      }));
      cleanErrors();
    };

    const removeEmail = (index: number) => {
      setData((prev) => {
        if (prev.emails.length === 1) return prev;

        const nextEmails = prev.emails
          .filter((_, currentIndex) => currentIndex !== index)
          .map((email, currentIndex) => ({
            ...email,
            order: currentIndex + 1,
          }));

        if (!nextEmails.some((email) => email.isPrimary)) {
          nextEmails[0].isPrimary = true;
        }

        return {
          ...prev,
          emails: nextEmails,
        };
      });

      cleanErrors();
    };

    const setPrimaryEmail = (index: number) => {
      setData((prev) => ({
        ...prev,
        emails: prev.emails.map((email, currentIndex) => ({
          ...email,
          isPrimary: currentIndex === index,
        })),
      }));
      cleanErrors();
    };

    /* SOCIAL LINKS */
    const addSocialLink = (type: ContactSocialType) => {
      setData((prev) => ({
        ...prev,
        socialLinks: [
          ...prev.socialLinks,
          {
            id: null,
            type,
            url: "",
            order: prev.socialLinks.length + 1,
          },
        ],
      }));
      cleanErrors();
    };

    const updateSocialLink = (
      index: number,
      field: keyof Pick<ContactSocialLink, "type" | "url">,
      value: string
    ) => {
      setData((prev) => ({
        ...prev,
        socialLinks: prev.socialLinks.map((social, currentIndex) =>
          currentIndex === index
            ? {
                ...social,
                [field]: field === "type" ? (value as ContactSocialType) : value,
              }
            : social
        ),
      }));
      cleanErrors();
    };

    const removeSocialLink = (index: number) => {
      setData((prev) => ({
        ...prev,
        socialLinks: prev.socialLinks
          .filter((_, currentIndex) => currentIndex !== index)
          .map((social, currentIndex) => ({
            ...social,
            order: currentIndex + 1,
          })),
      }));
      cleanErrors();
    };
    /* fin - SOCIAL LINKS */

    const validateAndCommit = async (): Promise<boolean> => {
      const dataToSave: ContactInfo = {
        ...data,
        phones: data.phones.map((phone, index) => ({
          ...phone,
          id: phone.id ?? null,
          order: index + 1,
        })),
        emails: data.emails.map((email, index) => ({
          ...email,
          id: email.id ?? null,
          order: index + 1,
        })),
        socialLinks: data.socialLinks.map((social, index) => ({
          ...social,
          id: social.id ?? null,
          order: index + 1,
        })),
      };

      const result = contactInfoValidation.safeParse(dataToSave);

      if (!result.success) {
        setErrors(mapZodIssuesToErrors(result.error.issues));
        setSaveError("Revisa los campos obligatorios antes de guardar.");
        return false;
      }
      try {
        setErrors({});
        setSaveError("");
        const nextSaved: ContactInfo = {
          seccionId: result.data.seccionId ?? null,
          address: result.data.address,
          businessHours: result.data.businessHours ?? "",
          latitud: result.data.latitud,
          longitud: result.data.longitud,
          phones: result.data.phones.map((phone, index) => ({
            id: phone.id ?? null,
            value: phone.value,
            isPrimary: phone.isPrimary,
            order: index + 1,
          })),
          emails: result.data.emails.map((email, index) => ({
            id: email.id ?? null,
            value: email.value,
            isPrimary: email.isPrimary,
            order: index + 1,
          })),
          socialLinks: result.data.socialLinks.map((social, index) => ({
            id: social.id ?? null,
            type: social.type,
            url: social.url,
            order: index + 1,
          })),
        };
        await onCommitSave(nextSaved);
        return true;
      } catch (error: unknown) {
        let message = "No se pudieron guardar los cambios.";
        if (axios.isAxiosError(error)) {
          message = error.response?.data?.message || message;
        }
        setSaveError(message);
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      submit: validateAndCommit,
    }));

    return (
      <Stack spacing={3}>
        {saveError ? <Alert severity="error">{saveError}</Alert> : null}

        <Typography fontWeight={700} mb={2}>Información Básica</Typography>
        <Stack spacing={2}>
          <TextField
            label="Dirección"
            fullWidth
            multiline
            value={data.address}
            onChange={(event) => handleChange("address", event.target.value)}
            error={Boolean(errors.address)}
            helperText={errors.address}
          />
          <TextField
            label="Horarios de atención"
            fullWidth
            multiline
            minRows={2}
            value={data.businessHours}
            onChange={(event) => handleChange("businessHours", event.target.value)}
            error={Boolean(errors.businessHours)}
            helperText={errors.businessHours}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            {/* telefonos */}
            <ContactDynamicListCard
              type="contact"
              title="Teléfonos"
              addLabel="+ Agregar"
              items={data.phones}
              placeholder="Teléfono"
              errors={errors.phones}
              onAdd={addPhone}
              onUpdate={updatePhone}
              onRemove={removePhone}
              onSetPrimary={setPrimaryPhone}
            />
            {/* correos */}
            <ContactDynamicListCard
              type="contact"
              title="Correos"
              addLabel="+ Agregar"
              items={data.emails}
              placeholder="Correo electrónico"
              errors={errors.emails}
              onAdd={addEmail}
              onUpdate={updateEmail}
              onRemove={removeEmail}
              onSetPrimary={setPrimaryEmail}
            />
          </Box>
          {/* redes sociales */}
          <ContactDynamicListCard
            type="social"
            title="Redes sociales"
            addLabel="+ Agregar"
            items={data.socialLinks}
            errors={errors.socialLinks}
            onAddSocial={addSocialLink}
            onUpdateSocial={updateSocialLink}
            onRemove={removeSocialLink}
          />
        </Stack>

        <Stack spacing={0.5}>
          <Typography fontWeight={700}>Configuración del Mapa</Typography>
          <Typography variant="body2" color="text.secondary">
            Haz clic en cualquier parte del mapa o arrastra el marcador para establecer la ubicación exacta.
          </Typography>
        </Stack>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField
            label="Latitud"
            type="number"
            sx={numberInputSx}
            inputProps={{ step: "any" }}
            value={data.latitud ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              handleChange("latitud", Number(value));
            }}
            error={Boolean(errors.latitud)}
            helperText={errors.latitud}
          />
          <TextField
            label="Longitud"
            type="number"
            sx={numberInputSx}
            inputProps={{ step: "any" }}
            value={data.longitud ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              handleChange("longitud", Number(value));
            }}
            error={Boolean(errors.longitud)}
            helperText={errors.longitud}
          />
        </Box>

        <Box sx={{ mt: 2, height: 350, width: "100%", borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider", mb: 3 }}>
          {data.latitud !== undefined && data.longitud !== undefined ? (
            <MapContainer
              center={[data.latitud || -17.3934375, data.longitud || -66.1485625]}
              zoom={17}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker
                position={[data.latitud || -17.3934375, data.longitud || -66.1485625]}
                setPosition={([lat, lng]) => {
                  setData((prev) => ({ ...prev, latitud: lat, longitud: lng }));
                  cleanErrors();
                }}
              />
              <ChangeMapCenter center={[data.latitud || -17.3934375, data.longitud || -66.1485625]} />
            </MapContainer>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "grid",
                placeItems: "center",
                color: "text.secondary",
              }}
            >
              Cargando mapa...
            </Box>
          )}
        </Box>
      </Stack>
    );
  }
);

type ContactListItem = {
  id: number | null;
  value: string;
  isPrimary: boolean;
  order: number;
};

/* SOCIAL LINKS */
const SOCIAL_OPTIONS: { value: ContactSocialType; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
];

type ContactDynamicListCardProps =
  | {
      type: "contact";
      title: string;
      addLabel: string;
      items: ContactListItem[];
      placeholder: string;
      errors?: { value?: string }[];
      onAdd: () => void;
      onUpdate: (index: number, value: string) => void;
      onRemove: (index: number) => void;
      onSetPrimary: (index: number) => void;
    }
  | {
      type: "social";
      title: string;
      addLabel: string;
      items: ContactSocialLink[];
      errors?: { url?: string }[];
      onAddSocial: (type: ContactSocialType) => void;
      onUpdateSocial: (
        index: number,
        field: keyof Pick<ContactSocialLink, "type" | "url">,
        value: string
      ) => void;
      onRemove: (index: number) => void;
    };

function ContactDynamicListCard(props: ContactDynamicListCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSocial = props.type === "social";
  const selectedSocialTypes = isSocial ? props.items.map((item) => item.type) : [];

  const availableOptions = SOCIAL_OPTIONS.filter(
    (option) => !selectedSocialTypes.includes(option.value)
  );

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isSocial) {
      setAnchorEl(event.currentTarget);
      return;
    }
    props.onAdd();
  };

  const handleSelectSocial = (type: ContactSocialType) => {
    if (!isSocial) return;
    props.onAddSocial(type);
    setAnchorEl(null);
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          gap={1}
        >
          <Typography fontWeight={700}>{props.title}</Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleAddClick}
            disabled={isSocial && availableOptions.length === 0}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
          >
            {props.addLabel}
          </Button>

          {isSocial ? (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {availableOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleSelectSocial(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          ) : null}
        </Stack>

        {props.items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Aún no se agregó información.</Typography>
        ) : (
          <Stack spacing={2}>
            {props.items.map((item, index) => {
              if (isSocial) {
                const social = item as ContactSocialLink;
                const socialLabel =
                  SOCIAL_OPTIONS.find((option) => option.value === social.type)
                    ?.label ?? social.type;

                return (
                  <Stack
                    key={`${social.type}-${social.id ?? index}`}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <TextField
                      label={`${socialLabel} URL`}
                      fullWidth
                      multiline
                      value={social.url}
                      onChange={(event) => props.onUpdateSocial(index, "url", event.target.value)}
                      error={Boolean(props.errors?.[index]?.url)}
                      helperText={props.errors?.[index]?.url}
                    />

                    <IconButton
                      color="error"
                      onClick={() => props.onRemove(index)}
                      aria-label={`Eliminar red social ${index + 1}`}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Stack>
                );
              }

              const contact = item as ContactListItem;

              return (
                <Stack
                  key={`${props.title}-${contact.id ?? index}`}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <TextField
                    label={`${props.placeholder} ${index + 1}`}
                    fullWidth
                    multiline
                    value={contact.value}
                    onChange={(event) => props.onUpdate(index, event.target.value)}
                    error={Boolean(props.errors?.[index]?.value)}
                    helperText={props.errors?.[index]?.value}
                  />

                  <Radio
                    checked={contact.isPrimary}
                    onChange={() => props.onSetPrimary(index)}
                  />

                  <Typography
                    sx={{
                      display: { xs: "none", sm: "block" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    Principal
                  </Typography>

                  <IconButton
                    color="error"
                    onClick={() => props.onRemove(index)}
                    disabled={props.items.length === 1}
                    aria-label={`Eliminar ${props.placeholder} ${index + 1}`}
                  >
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default ContactInfoTab;
