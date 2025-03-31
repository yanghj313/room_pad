$(document).ready(function () {
	// 버블차트 구현
	const data = [
		{ id: '소설원작' },
		{ id: '일본' },
		{ id: '어린이' },
		{ id: '일상' },
		{ id: '힐링' },
		{ id: '학습만화' },
		{ id: '단행본' },
		{ id: '동물' },
		{ id: '음악' },
		{ id: '미국' },
		{ id: '추리' },
		{ id: '웹툰' },
	];
	const colors = ['#48A9C1', '#81A8DA', '#9BBA6A', '#B48D69', '#C48EC7', '#E17664', '#F58994', '#FF913F', '#FFAC1D'];
	const selectedColor = '#7964C4';
	let selectedBubbles = new Set();

	const isLargeScreen = window.innerWidth >= 2160;
	const width = isLargeScreen ? 1600 : 800;
	const height = isLargeScreen ? 1500 : 750;
	const sizes = isLargeScreen ? [563, 285, 285, 285, 285, 352, 352, 352, 352, 433, 433, 433] : [282, 143, 143, 143, 143, 176, 176, 176, 176, 217, 217, 217];
	const fontSize = isLargeScreen ? 52 : 26;
	const shadowLarge = 'drop-shadow(30px 40px 50px rgba(170, 170, 170, 0.50))';
	const shadowSmall = 'drop-shadow(15px 20px 10px rgba(170, 170, 170, 0.50))';

	data.forEach((d, i) => {
		d.radius = sizes[i] / 2;
		d.x = Math.random() * (width - 2 * d.radius) + d.radius;
		d.y = Math.random() * (height - 2 * d.radius) + d.radius;
	});

	const svg = d3.select('.bubble_chart').append('svg').attr('width', width).attr('height', height);

	const simulation = d3
		.forceSimulation(data)
		.force('x', d3.forceX(width / 2).strength(0.1))
		.force('y', d3.forceY(height / 2).strength(0.1))
		.force(
			'collide',
			d3.forceCollide().radius(d => d.radius + (isLargeScreen ? 50 : 25))
		)
		.on('tick', ticked);

	const nodes = svg
		.selectAll('.bubble')
		.data(data)
		.enter()
		.append('g')
		.attr('class', 'bubble')
		.call(d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded))
		.on('click', function (event, d) {
			const circle = d3.select(this).select('circle');
			if (selectedBubbles.has(d.id)) {
				selectedBubbles.delete(d.id);
				circle
					.transition()
					.duration(200)
					.attr('fill', colors[data.findIndex(item => item.id === d.id) % colors.length])
					.style('filter', null);
			} else {
				if (selectedBubbles.size < 3) {
					selectedBubbles.add(d.id);
					circle
						.transition()
						.duration(200)
						.attr('fill', selectedColor)
						.style('filter', isLargeScreen ? shadowLarge : shadowSmall);
				}
			}
			updateKeywordList();
		});

	nodes
		.append('circle')
		.attr('r', d => d.radius)
		.attr('fill', (d, i) => colors[i % colors.length]);

	nodes
		.append('text')
		.attr('text-anchor', 'middle')
		.attr('dominant-baseline', 'middle')
		.style('font-size', fontSize + 'px')
		.style('fill', 'white')
		.style('pointer-events', 'none')
		.each(function (d) {
			const text = d3.select(this);
			const words = d.id.match(/.{1,4}/g) || [d.id];
			const totalLines = words.length;
			const startY = -((totalLines - 1) * fontSize) / 2;

			words.forEach((word, i) => {
				text
					.append('tspan')
					.attr('x', 0)
					.attr('dy', i === 0 ? startY : fontSize)
					.text(word);
			});
		});

	function ticked() {
		nodes.attr('transform', d => {
			d.x = Math.max(d.radius, Math.min(width - d.radius, d.x));
			d.y = Math.max(d.radius, Math.min(height - d.radius, d.y));
			return `translate(${d.x},${d.y})`;
		});
	}

	function dragStarted(event, d) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(event, d) {
		d.fx = event.x;
		d.fy = event.y;
	}

	function dragEnded(event, d) {
		if (!event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

	function updateKeywordList() {
		const keywordList = $('.selected_keyword_list');
		keywordList.empty();

		if (selectedBubbles.size === 0) {
			keywordList.append('<div>키워드는 최대 3개까지 선택이 가능해요</div>');
		} else {
			selectedBubbles.forEach(keyword => {
				const displayKeyword = keyword.match(/.{1,4}/g)?.join(' ') || keyword;
				const keywordDiv = $(`
                    <div class="keyword">
                        <div>${displayKeyword}</div>
                        <img src="/resources/ict/img/kiosk/delete_keyword.svg" alt="삭제" />
                    </div>
                `);
				keywordList.append(keywordDiv);

				keywordDiv.find('img').on('click', function () {
					selectedBubbles.delete(keyword);
					const bubble = svg.selectAll('.bubble').filter(d => d.id === keyword);
					const index = data.findIndex(item => item.id === keyword);
					bubble
						.select('circle')
						.transition()
						.duration(200)
						.attr('fill', colors[index % colors.length])
						.style('filter', null);
					updateKeywordList();
				});
			});
		}
	}

	$('.change').click(function () {
		selectedBubbles.clear();

		svg
			.selectAll('.bubble')
			.select('circle')
			.transition()
			.duration(200)
			.attr('fill', (d, i) => colors[i % colors.length])
			.style('filter', null);

		data.forEach(d => {
			d.x = Math.random() * (width - 2 * d.radius) + d.radius;
			d.y = Math.random() * (height - 2 * d.radius) + d.radius;
		});
		simulation.alpha(1).restart();

		updateKeywordList();
	});

	updateKeywordList();
});
