import { z } from "zod";

export const resumeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    templateId: z.string().default("modern-sidebar"),
    personalInfo: z.object({
        fullName: z.string().min(1, "Full Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().optional(),
        website: z.string().url("Invalid URL").optional().or(z.literal("")),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
        instagram: z.string().optional(),
        location: z.string().optional(),
        photoUrl: z.string().optional(),
    }),
    summary: z.string().optional(),
    experience: z.array(
        z.object({
            id: z.string(),
            company: z.string().min(1, "Company is required"),
            position: z.string().min(1, "Position is required"),
            startDate: z.string(),
            endDate: z.string().optional(),
            current: z.boolean().default(false),
            location: z.string().optional(),
            description: z.string(),
        })
    ).default([]),
    education: z.array(
        z.object({
            id: z.string(),
            school: z.string().min(1, "School is required"),
            degree: z.string().min(1, "Degree is required"),
            startDate: z.string(),
            endDate: z.string().optional(),
            description: z.string().optional(),
        })
    ).default([]),
    skills: z.array(z.string()).default([]),
});

export type ResumeData = z.infer<typeof resumeSchema>;
