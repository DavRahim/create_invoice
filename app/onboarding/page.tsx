"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButtons } from "../components/SubmitButtons";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

export default function Onboarding() {
    const [lastResult, action] = useActionState(onboardUser, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    });
    return (
        <div className="min-h-screen w-screen flex items-center">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl ">
                        You Are almost finished
                    </CardTitle>
                    <CardDescription>
                        Enter you information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    placeholder="Jon" />
                                <p className="text-red-500 text-xs">{fields.firstName.errors}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue}
                                    placeholder="Doe" />
                                <p className="text-red-500 text-xs">{fields.lastName.errors}</p>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue}
                                placeholder="Chad street 123" />
                            <p className="text-red-500 text-xs">{fields.address.errors}</p>

                        </div>
                        <SubmitButtons text="Finish onboarding" />
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}