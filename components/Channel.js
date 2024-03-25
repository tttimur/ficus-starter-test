
export default function Channel({ channel, title }) {
	return (
		<div className="p-8">
			<h1 className="text-center my-24">{title || channel.title} <sup>{channel?.user?.full_name}</sup></h1>

			<div className="flex flex-wrap items-center justify-center">
				{channel?.contents?.map((block) => {
					console.log(block, "BVDd")

					if (block?.class === 'Image') {
						return (
							<img key={block.id} src={block.image?.thumb?.url} alt={block.title} className="w-1/10 px-2 py-2 object-contain" />
						)
					} else return null

				})}
			</div>
		</div>
	)
}
