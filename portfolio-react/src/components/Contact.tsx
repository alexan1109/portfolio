import React, {useState, FormEvent} from 'react'

function Contact() {

type ContactInfo = {
    email: string;
  }

const email = 'alexanhm@hiof.no'
function Contact({ email }: ContactInfo) {
    return (
      <>
      <p>{email}</p>
      </>
    )
  }

  const handleClick =  () => {
    alert(email);
}

const [messages, setMessages] = useState<
{ id: ReturnType<typeof crypto.randomUUID>; name: string; message: string; }[]
>([]);;

const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement | null;

  if (!form) return;
  const formData = new FormData(form);

  const name = formData.get('fname');
  const message = formData.get('message');
  if (!name || !message || typeof name !== 'string' || typeof message !== 'string') return;

  setMessages((prev) => [
    ...prev,
    {id: crypto.randomUUID(), name, message},
]);
  

  form.reset();

} 

return (
    <>
    <h4>Contact me here: </h4>
    <pre>
      {JSON.stringify(
        {messages}
      )}
    </pre>
    <form className="form" onSubmit={handleFormSubmit}>
      <input className="form-name"
            name="fname"
            id="fname" 
            
            type="text" 
            placeholder='Write your name...'
            data-testid="form-input-name"/><br/>
      <textarea className="form-message"
            name="message"
            id="message" 
            placeholder='Write your message here...' 
            data-testid="form-input-message" /><br/>
      <button className='form-submit' type="submit">Submit</button>
    </form><br/><br/>
    <p>Or write to this email adress (Shown by pressing this button):</p>
    <button onClick={handleClick}>Vis email</button>
    </>
)
}

export default Contact
