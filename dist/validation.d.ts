import { z } from "zod";
export declare const suggestionSchema: z.ZodObject<{
    itemName: z.ZodString;
    category: z.ZodString;
    mapName: z.ZodString;
    locationDescription: z.ZodString;
    notes: z.ZodString;
    sourceUrl: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string, string | undefined>>, z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>>;
}, z.core.$strip>;
export declare const contactSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    organization: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string, string | undefined>>;
    inquiryType: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export declare const adminLoginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const adminUserCreateSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        superadmin: "superadmin";
    }>;
}, z.core.$strip>;
export declare const adminUserRoleSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        superadmin: "superadmin";
    }>;
}, z.core.$strip>;
export declare const adminUserEnabledSchema: z.ZodObject<{
    userId: z.ZodString;
    enabled: z.ZodEnum<{
        true: "true";
        false: "false";
    }>;
}, z.core.$strip>;
export declare const adminUserPasswordResetSchema: z.ZodObject<{
    userId: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const siteVisibilitySchema: z.ZodObject<{
    key: z.ZodString;
    publicEnabled: z.ZodEnum<{
        true: "true";
        false: "false";
    }>;
}, z.core.$strip>;
export declare const adminPasswordChangeSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const reconMarkerSuggestionSchema: z.ZodObject<{
    suggestionType: z.ZodPipe<z.ZodOptional<z.ZodEnum<{
        new_marker: "new_marker";
        marker_correction: "marker_correction";
    }>>, z.ZodTransform<"new_marker" | "marker_correction", "new_marker" | "marker_correction" | undefined>>;
    targetMarkerId: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string, string | undefined>>;
    gameId: z.ZodString;
    mapId: z.ZodString;
    mode: z.ZodString;
    variant: z.ZodString;
    category: z.ZodString;
    label: z.ZodString;
    description: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string, string | undefined>>;
    x: z.ZodCoercedNumber<unknown>;
    y: z.ZodCoercedNumber<unknown>;
    floor: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string, string | undefined>>;
    iconKey: z.ZodString;
    sourceUrl: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string, string | undefined>>, z.ZodUnion<readonly [z.ZodLiteral<"">, z.ZodString]>>;
    submitterNote: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string, string | undefined>>;
}, z.core.$strip>;
export declare function formDataToObject(formData: FormData): {
    [k: string]: FormDataEntryValue;
};
