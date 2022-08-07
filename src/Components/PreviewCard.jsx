import "./PreviewCard.css";
import { noThumbImg } from "../assets";

export const PreviewCard = ({ linkData }) => {
	console.log('linkData: ', linkData);
	return (
		<div className="card">
			<div className="card-upper">
				<img
					src={linkData?.image?.url || noThumbImg}
					alt="link thumbnail"
				/>
			</div>
			<div className="card-lower">
				{/* <div className="lower-data"> */}
				<h2 className="font-">
					{linkData?.title || "No Title provided."}
				</h2>
				<p className="">
					{linkData?.description || "No Description provided."}
				</p>
				{/* </div> */}
				<div className="lower-title">
					<p className="font-primary">
						{(linkData?.name)?.toLowerCase()}
					</p>
					<div className="lower-icon">
						{linkData?.icon?.url&&<img src={linkData?.icon?.url || ""} alt="link icon" />}
					</div>
				</div>
			</div>
		</div>
	);
};
