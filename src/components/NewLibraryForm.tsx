import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field.tsx"
import React, { useState } from "react"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Toaster } from "@/components/ui/sonner.tsx"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
export function NewLibraryForm(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState<string | undefined>()
  const [story, setStory] = useState("")
  const [library, setLibrary] = useState("")
  const [honey, setHoney] = useState("")
  async function handleSubmit(event: React.SubmitEvent){
    event.preventDefault()
    if(honey.length>0){
      toast.success("Story Submitted!")
      return
    }
    try{
      const resp = await fetch("/api/new-library", {
        method: "POST",
        body: JSON.stringify({
          firstName,lastName,email,country,"state": state, library, story, "honey": honey
        })
      })
      if(!resp.ok){
        toast.error(  `${resp.status}: ${resp.statusText}`)
      }else{
        toast.success("Story Submitted!")
      }
    } catch (e) {
      toast.error(String(e))
    }
  }

  
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-2xl"}>
        Submit your Library's Story!
        </CardTitle>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel>
              First Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>
              Last Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>Library Name</FieldLabel>
            <Input
              required
              value={library}
              onChange={(e) => setLibrary(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>
              Email <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              required
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>
              Country <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>US State</FieldLabel>
            <FieldDescription>
              If your library is based in the US, would you mind telling us
              which state(s)? That will allow us to render a country map with
              your state highlighted
            </FieldDescription>
            <Input value={state} onChange={(e) => setState(e.target.value)} />
          </Field>
          <Field>
            <FieldLabel>
              Story <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldDescription>
              You can write up the story of your library here, or if you would
              like to just send us your writeup as a document, just say so below
              and we will reach out to the above email
            </FieldDescription>
            <Textarea
              required
              value={story}
              onChange={(e) => setStory(e.target.value)}
            ></Textarea>
          </Field>
          <Field style={{ display: "none" }}>
            <FieldLabel>Please tell us more!</FieldLabel>
            <Input
              value={honey}
              onChange={(e) => {
                setHoney(e.target.value)
              }}
            ></Input>
          </Field>
          <Button type={"submit"}>Submit</Button>
        </FieldGroup>
        <Toaster />
      </form>
  </CardContent>
    </Card>
  )
}