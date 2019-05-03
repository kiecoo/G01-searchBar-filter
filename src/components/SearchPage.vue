<template>
  <div class="container-fluid">
    <div class="search-wrapper">
			<!-- the search bar form -->
      <form v-on:submit="getfilteredData">
        <div class="form-row">
          <div class="col-10">
            <input type="text" class="form-control" placeholder="Enter key word  ..." v-model="search.word" v-on:keyup="getfilteredData">
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </form>
			<!-- checkboxes -->
			<div id="checkboxes">
				<div v-for="(stack,index) in tagWholeList" :key="index" class="form-check form-check-inline">
					<input class="form-check-input" type="checkbox"  v-model="stack.checked" v-on:change="getfilteredData">
					<label class="form-check-label">
						{{ stack.value }}
					</label>
				</div>
			</div>
		</div>

    <div class="card-columns">
			<!-- iterate data -->
      <item-card v-for="(item, index) in filteredData" :key="index" :item="item"></item-card>
    </div>
  </div>
</template>

<script>
import ItemCard from './ItemCard';
import data from '../data/data';

export default {
	name: 'SearchPage',
	components: {
		'item-card': ItemCard
	},
	computed: {
		selectedTags: function() {
			let filters = [];
			let checkedTags = this.tagWholeList.filter(obj => obj.checked);
			checkedTags.forEach(element => {
				filters.push(element.value);
			});
			return filters;
		}
	},
	data() {
		return {
			filteredData: [],
      search: {
        word:'',
        type:'',
        tags:''
        },
      tagWholeList: [
      {
        checked: false,
        value: 'tag1_Unpackaged'
      },
      {
        checked: false,
        value: 'tag2_ZeroWaste'
      },
      {
        checked: false,
        value: 'tag3'
      },
      {
        checked: false,
        value: 'tag4'
      }
    ]
  };
},
	methods: {
		getfilteredData: function() {
			this.filteredData = data;
			let filteredDataByTags = [];
			let filteredDataByWord = [];
			// first check if tags where selected
			if (this.selectedTags.length > 0) {
				filteredDataByTags= this.filteredData.filter(obj => this.selectedTags.every(val => obj.stack.indexOf(val) >= 0));
				this.filteredData = filteredDataByTags;
			}
			// then filter according to keyword, for now this only affects the name attribute of each data
			if (this.search.word !== '') {
				filteredDataByWord = this.filteredData.filter(obj => obj.name.indexOf(this.search.word.toLowerCase()) !== -1);
				this.filteredData = filteredDataByWord;
			}
		}
	},
	mounted() {
		this.getfilteredData();
	}
};
</script>
