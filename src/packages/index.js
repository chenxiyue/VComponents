import VcTable from "./vc-table/index.vue";
import VcWaterfall from "./vc-waterfall/index.vue";

const components = [
	VcTable,
	VcWaterfall
];

const VCComponent = {
	install (Vue) {
		components.forEach(item => {
			Vue.component(item.name, item);
		});
	}
};

export default VCComponent;
