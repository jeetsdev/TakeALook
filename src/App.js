import axios from "axios";
import { useState } from "react";
import "./App.css";
import { Triangle } from "react-loader-spinner";
import { PreviewCard } from "./Components/PreviewCard";
import toast, { Toaster } from "react-hot-toast";

function App() {
	const [formData, setFormData] = useState("");
	const [loaderFlag, setLoaderFlag] = useState(false);
	const [linkData, setLinkData] = useState();

	const fecthData = async () => {
		setLoaderFlag(true);
		try {
			const res = await axios.post(
				"https://api.peekalink.io/",
				{ link: formData },
				{
					headers: {
						"X-API-Key": "2fc465eb-59ae-4923-9321-8e1f270e1394",
					},
				},
			);
			setLoaderFlag((prev) => false);
			setLinkData(res?.data);
			setFormData("");
		} catch (error) {
			if (error?.response.status === 404) {
				toast.error("Link not found.");
			} else {
				toast.error("Some error occured, Try again later.");
			}
			setLoaderFlag((prev) => false);
		}
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();
		setLinkData(undefined);
		if (formData.trim() !== "") {
			fecthData();
		} else {
			toast.error("Please enter an url first.");
		}
	};

	return (
		<div className="App">
			<Toaster position="top-right" />
			<h1 className="font-primary">Link Previewer</h1>
			<form action="" onSubmit={formSubmitHandler}>
				<input
					type="text"
					value={formData}
					onChange={(e) => setFormData(e.target.value)}
				/>
				<button type="submit">Preview</button>
			</form>

			{loaderFlag && (
				<Triangle
					height="80"
					width="80"
					radius="9"
					color="#ff6491"
					ariaLabel="three-dots-loading"
					wrapperStyle
					wrapperClass
				/>
			)}
			<div>{linkData && <PreviewCard linkData={linkData} />}</div>
			{linkData && (
				<a href={linkData?.url} target={"_blank"} rel="noreferrer">
					Go to Website
				</a>
			)}
		</div>
	);
}

export default App;
