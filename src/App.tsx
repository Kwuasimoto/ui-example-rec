import { OnChange, OnSubmit } from "@types"
import axios from "axios"
import { createSignal } from "solid-js"

const is_production = import.meta.env["VITE_PRODUCTION"] === "production"

const sanitizeInput = (input: string) => {
  return input.trim()
}

function App() {

  

  const [inputValue, setInputValue] = createSignal("")
  const [dialogFlowResponse, setDialogFlowResponse] = createSignal("")

  const handleInputChange = (e: OnChange) => {
    setInputValue(sanitizeInput(e.target.value))
  }

  // Event handler for form submission
  const handleSubmit = async (e: OnSubmit) => {
    e.preventDefault(); // keeps page from reloading
    const target_url = is_production ? "https://flask-render-example-x3ol.onrender.com" : "http://127.0.0.1:8080"
    try {
      // Send the sanitized input to the server using Axios
      console.log("Sending Data:", inputValue());
      const response = await axios.post(
        `${target_url}/test-df`,
        {
          data: inputValue(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Handle the response from the server (you can customize this part)
      console.log("Server response:", response.data);
      setDialogFlowResponse(response.data)
    } catch (error) {
      // Handle errors (you can customize this part)
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div class="flex h-full flex-col bg-blue-500">
        <div class="h-10 pl-2 pt-2">Test App w/ SolidJS</div>
        <div class="flex flex-col pt-10">
          <input
            class="h-40 w-[50%] self-center"
            onChange={handleInputChange}
          ></input>
        </div>
        <div class="flex flex-col">
          <button class="w-[33%] self-center" onClick={handleSubmit}>
            Submit Query
          </button>
        </div>
        <div class="flex h-full flex-col pt-10">
          <div class="w-[50%] self-center">Response:</div>
          <div class="h-full">{dialogFlowResponse()}</div>
        </div>
      </div>
    </>
  )
}

export default App
