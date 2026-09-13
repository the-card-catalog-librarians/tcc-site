import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field.tsx"
import React, { use, useState } from "react"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Toaster } from "@/components/ui/sonner.tsx"
import { toast } from "sonner"
export function NewLibraryForm(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState<string | undefined>()
  const [story, setStory] = useState("")
  const [library, setLibrary] = useState("")
  async function handleSubmit(event: React.SubmitEvent){
    event.preventDefault()
    try{
      const resp = await fetch("/api/new-library", {
        method: "POST",
        body: JSON.stringify({
          firstName,lastName,email,country,"state": state, library, story
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
          <Input required value={library} onChange={(e)=>(setLibrary(e.target.value))}/>
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
            If your library is based in the US, would you mind telling us which
            state(s)? That will allow us to render a country map with your state
            highlighted
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
          <Textarea required value={story} onChange={(e)=>setStory(e.target.value)}></Textarea>
        </Field>
        <Button type={"submit"}>Submit</Button>
      </FieldGroup>
      <Toaster/>
    </form>
  )
}