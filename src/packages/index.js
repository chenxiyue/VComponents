import VcTable from "./vc-table/index.vue";

const components = [
	VcTable
];

const VCComponent = {
	install (Vue) {
		components.forEach(item => {
			Vue.component(item.name, item);
		});
	}
};

export default VCComponent;
