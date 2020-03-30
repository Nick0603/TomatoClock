import $ from 'jquery';

const storage = localStorage.getItem('itemsData'); // Todo list data
const FINISH_STATUS = true;
const UNFINISH_STATUS = false;

const createNewItem = () => {
	let indexArray = [];
	if (storage != null) {
		var itemsData = JSON.parse(localStorage.getItem('itemsData'));
		Object.keys(itemsData).map((index, key) => {
			indexArray.push(itemsData[key].id);
		})
		var maxIndex = Math.max(...indexArray); // get max id
	} else {
		var itemsData = {};
		var maxIndex = 0;
	}

	const now = Date.now()
	const toDoItem = $("input[name='todoItem']").val();
	const toDoItemsData = {
		"id": maxIndex + 1,
		"task": toDoItem,
		"status": UNFINISH_STATUS,
		"created_at": now
	}

	if (Object.entries(itemsData).length == 0) {
		var objects = [toDoItemsData];
	} else {
		var objects = itemsData.concat([toDoItemsData]);
	}

	localStorage.setItem('itemsData', JSON.stringify(objects));
	location.reload();
}

// show choose status items
const showToDoList = status => {
	if (storage != null) {
		const itemsData = JSON.parse(localStorage.getItem('itemsData'));
		let showItems = "";
		Object.keys(itemsData).map((index, key) => {
			if (itemsData[key].status == status) {
				showItems += `
					<li>
						<div class="round">
							<input type="checkbox" id="checkbox" />
							<label for="checkbox"></label>
						</div>
						<span>${itemsData[key].task}</span>
					</li>
					<hr class="break-line">
				`;
			}
		})

		$(".show-todo-list").html(showItems);
	}
}

// get todo list items, if null return empty array
const getTodoListItems = status => {
	let itemsArray = [];
	if (storage != null) {
		const itemsData = JSON.parse(localStorage.getItem('itemsData'));
		Object.keys(itemsData).map((index, key) => {
			if (itemsData[key].status == status) {
				itemsArray.push(itemsData[key]);
			}
		})

		return itemsArray;
	}

	return [];
}

// 更新指定 id 的狀態
const updateItemsStatus = (id, status) => {
	var storage = localStorage.getItem('itemsData');
	let itemsArray = [];
	if (storage != null) {
		var itemsData = JSON.parse(localStorage.getItem('itemsData'));
		if (typeof status === "boolean") {
			Object.keys(itemsData).map((index, key) => {
				if (itemsData[key].id == id) {
					itemsData[key].status = status;
				}
			})
		}
		localStorage.setItem('itemsData', JSON.stringify(itemsData));
	}
}

const init = () => {
	// if dom ready, show status equal 0;
	if (storage != null) {
		showToDoList(FINISH_STATUS);
	}
	// add to do item
	$(".add-icon").click(createNewItem);

	$(".doing-btn").click(() => {
		showToDoList(UNFINISH_STATUS);
		$(".not-finish").css("opacity", 1);
		$(".finish").css("opacity", 0.5);
	})

	$(".finish-btn").click(() => {
		showToDoList(FINISH_STATUS);
		$(".not-finish").css("opacity", 0.5);
		$(".finish").css("opacity", 1);
	})
}

export {
	init,
	getTodoListItems,
	updateItemsStatus
};
