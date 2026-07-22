import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export function SNSubscribeForm() {

    const [firstName, setFirstname] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [touched, setTouched] = useState(false);
    function reset() {
        setFirstname("")
        setLastName("")
        setEmail("")
        setTouched(false)
    }
    const isValid = firstName.trim() && lastName.trim() && email.trim();

    function submit() {
        setTouched(true);
        if (!isValid) return;
        window.location.href = `https://app.smore.com/lists/confirm_subscribe?${params}`;
    }

    const params = new URLSearchParams({
        list_id: "6a6114e9ca5ae5e055a824ff",
        email,
        name: firstName.trim() + " " + lastName.trim(),
        subscribe: "Subscribe"
    });
    const invalidFirst = touched && !firstName.trim()
    const invalidLast = touched && !lastName.trim()
    const invalidEmail = touched && !email.trim()

    return (
        <div className="p-4 m-auto max-w-125">
            <Card>
                <CardHeader>
                    <CardTitle>Subscribe to the Shelf Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Field data-invalid={invalidFirst}>
                            <FieldLabel htmlFor="firstName">First Name <span className="text-destructive">*</span></FieldLabel>
                            <Input required id="firstName" value={firstName} onChange={(e) => setFirstname(e.target.value)} aria-invalid={invalidFirst}></Input>
                            <FieldDescription>
                                {invalidFirst ? "Please enter your first name" : ""}
                            </FieldDescription>

                        </Field>
                        <Field data-invalid={invalidLast}>
                            <FieldLabel htmlFor="lastName">Last Name <span className="text-destructive">*</span></FieldLabel>
                            <Input required id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} aria-invalid={invalidLast}></Input>
                            <FieldDescription>
                                {invalidLast ? "Please enter your last name" : ""}
                            </FieldDescription>
                        </Field>
                        <Field data-invalid={invalidEmail}>
                            <FieldLabel htmlFor="email">Email <span className="text-destructive">*</span></FieldLabel>
                            <Input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={invalidEmail}></Input>
                            <FieldDescription>
                                {invalidEmail ? "Please enter your email" : ""}
                            </FieldDescription>
                        </Field>
                        <Field orientation="horizontal">
                            <Button onClick={reset} type="reset" variant={"outline"}>Reset</Button>
                            <Button onClick={submit} type="submit"
                            >
                                Subscribe
                            </Button>
                        </Field>
                    </FieldGroup>
                </CardContent>
            </Card>
        </div>
    );
}