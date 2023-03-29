import "./attachment.styles.scss";
import React, { useEffect, useState } from "react";
export default function Attachment(props) {
	const { attachments } = props;
	const [videos, setVideos] = useState([]);
	useEffect(() => {
		let array = [];
		for (let x = 0; x < attachments.length; x++) {
			if (attachments[x].link.toString().includes("youtu")) {
				array.push(attachments[x]);
			}
		}
		setVideos(array);
	}, [attachments]);

	return (
		<div className="attachment-container">
			{videos.map((vid, index) => {
				let split = vid?.link?.split("=");
				let id = split[split.length - 1];
				return (
					<div className="vid-container">
						<center>
							<h3>{vid.name}</h3>
						</center>
						<iframe
							width="100%"
							height="315"
							src={`https://www.youtube.com/embed/${id}`}
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						></iframe>
					</div>
				);
			})}
		</div>
	);
}
