import { IncidentType } from "src/core/enums/incident-type.enum";
import { IncidentCDto } from "src/core/interfaces/incident.interface";
import { generateMapBoxImage } from "src/core/utils/utils";
 
const incidentTypeLabels: Record<IncidentType, { label: string; color: string; category: string }> = {
    [IncidentType.THIEFS]: { label: "Robo menor", color: "#E74C3C", category: "Seguridad" },
    [IncidentType.ROBBERY]: { label: "Asalto", color: "#E74C3C", category: "Seguridad" },
    [IncidentType.VANDALISM]: { label: "Vandalismo", color: "#E74C3C", category: "Seguridad" },
    [IncidentType.FRAUD]: { label: "Fraude", color: "#E74C3C", category: "Seguridad" },
    [IncidentType.KIDNAPPING]: { label: "Secuestro", color: "#E74C3C", category: "Seguridad" },
    [IncidentType.TRAFFIC]: { label: "Congestionamiento vial", color: "#F39C12", category: "Vialidad" },
    [IncidentType.ACCIDENTS]: { label: "Accidente vial", color: "#F39C12", category: "Vialidad" },
    [IncidentType.POTHOLE]: { label: "Bache", color: "#F39C12", category: "Vialidad" },
    [IncidentType.BROKEN_TRAFFIC_LIGHT]: { label: "Semaforo descompuesto", color: "#F39C12", category: "Vialidad" },
    [IncidentType.FIRE]: { label: "Incendio", color: "#C0392B", category: "Emergencia" },
    [IncidentType.EXPLOSION]: { label: "Explosion", color: "#C0392B", category: "Emergencia" },
    [IncidentType.GAS_LEAK]: { label: "Fuga de gas", color: "#C0392B", category: "Emergencia" },
    [IncidentType.COLLAPSE]: { label: "Derrumbe", color: "#C0392B", category: "Emergencia" },
    [IncidentType.FLOOD]: { label: "Inundacion", color: "#2980B9", category: "Desastre natural" },
    [IncidentType.EARTHQUAKE]: { label: "Sismo", color: "#2980B9", category: "Desastre natural" },
    [IncidentType.LANDSLIDE]: { label: "Deslizamiento", color: "#2980B9", category: "Desastre natural" },
    [IncidentType.POWER_OUTAGE]: { label: "Corte de luz", color: "#8E44AD", category: "Servicios publicos" },
    [IncidentType.WATER_LEAK]: { label: "Fuga de agua", color: "#8E44AD", category: "Servicios publicos" },
    [IncidentType.OPEN_MANHOLE]: { label: "Alcantarilla abierta", color: "#8E44AD", category: "Servicios publicos" },
    [IncidentType.STREET_LIGHT_OUT]: { label: "Luminaria apagada", color: "#8E44AD", category: "Servicios publicos" },
    [IncidentType.MEDICAL_EMERGENCY]: { label: "Emergencia medica", color: "#1ABC9C", category: "Salud" },
    [IncidentType.POLLUTION]: { label: "Contaminacion", color: "#1ABC9C", category: "Salud" },
    [IncidentType.OTHER]: { label: "Otro", color: "#7F8C8D", category: "Otro" },
};
 
export const generateIncidentEmailTemplate = (incident: IncidentCDto): string => {
    const imageUrl = generateMapBoxImage(incident.lat,incident.lon);
    const typeInfo = incidentTypeLabels[incident.type] ?? { label: "Desconocido", color: "#7F8C8D", category: "Otro" };
    const date = new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
 
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:32px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
 
                        <!-- Header -->
                        <tr>
                            <td style="background:linear-gradient(135deg,${typeInfo.color},${typeInfo.color}cc);padding:32px 40px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <span style="display:inline-block;background-color:rgba(255,255,255,0.2);color:#ffffff;font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;">
                                                ${typeInfo.category}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top:16px;">
                                            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.3;">
                                                ${incident.title}
                                            </h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top:8px;">
                                            <span style="display:inline-block;background-color:#ffffff;color:${typeInfo.color};font-size:13px;font-weight:700;padding:6px 16px;border-radius:20px;">
                                                ${typeInfo.label}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
 
                        <!-- Description -->
                        <tr>
                            <td style="padding:32px 40px 0;">
                                <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">
                                    Descripcion
                                </h2>
                                <p style="margin:0;font-size:16px;color:#1f2937;line-height:1.6;">
                                    ${incident.description}
                                </p>
                            </td>
                        </tr>
 
                        <!-- Location Info -->
                        <tr>
                            <td style="padding:24px 40px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fb;border-radius:12px;overflow:hidden;">
                                    <tr>
                                        <td style="padding:20px 24px;">
                                            <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">
                                                Ubicacion
                                            </h2>
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td width="50%" style="padding-bottom:8px;">
                                                        <span style="font-size:12px;color:#9ca3af;font-weight:500;">Latitud</span><br/>
                                                        <span style="font-size:15px;color:#1f2937;font-weight:600;">${incident.lat}</span>
                                                    </td>
                                                    <td width="50%" style="padding-bottom:8px;">
                                                        <span style="font-size:12px;color:#9ca3af;font-weight:500;">Longitud</span><br/>
                                                        <span style="font-size:15px;color:#1f2937;font-weight:600;">${incident.lon}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
 
                        <!-- Map Image -->
                        <tr>
                            <td style="padding:24px 40px;">
                                <img src="${imageUrl}" width="520" style="width:100%;border-radius:12px;display:block;" alt="Mapa de ubicacion"/>
                            </td>
                        </tr>
 
                        <!-- Footer -->
                        <tr>
                            <td style="padding:0 40px 32px;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;padding-top:20px;">
                                    <tr>
                                        <td>
                                            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
                                                Reporte generado el ${date}
                                            </p>
                                            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">
                                                Sistema de Incidentes 612
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
 
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}