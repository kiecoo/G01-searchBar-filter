<template>
  <div class="container-fluid">
    <div class="search-wrapper">
        <div class="form-row">
          <!-- input of type -->
          <div class="col-3">
            <select v-model="search.type" v-on:change="getfilteredData">
              <option value="">全部類別</option>    
              <option v-for="(item, index) in typesWholeList" :key="index">{{ item }}</option>
            </select>
          </div>
          <!-- input of tags -->
			    <div id="checkboxes">
			    	<div v-for="(stack,index) in tagWholeList" :key="index" class="form-check form-check-inline">
				    	<input class="form-check-input" type="checkbox"  v-model="stack.checked" v-on:change="getfilteredData">
				    	<label class="form-check-label">
						    {{ stack.value }}
				    	</label>
			    	</div>
	    		</div>
          <!-- input of word -->
					<input-searchbar v-model="search.word" v-on:input="getfilteredData"></input-searchbar> 
          <div class="col-2">
            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
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
import InputSearchBar from './InputSearchBar';
import data from '../data/data';

export default {
	name: 'SearchPage',
	components: {
		'item-card': ItemCard,
		'input-searchbar': InputSearchBar,
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
			 message: 'hello',
      search: {
        word:'',
        type:'',
        tags:''
				},
			typesWholeList: [ "food_share","free_shop"], //所有的類別各項
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
			let filteredDataByType = [];
			let filteredDataByTags = [];
      let filteredDataByWord = [];
      var selectedType = this.search.type;
       // filter by type
      if (selectedType !== '') {
				filteredDataByType = this.filteredData.filter(obj => obj.type === selectedType);
				this.filteredData = filteredDataByType;
			}
			// filter by tags
			if (this.selectedTags.length > 0) {
				filteredDataByTags= this.filteredData.filter(obj => this.selectedTags.every(val => obj.stack.indexOf(val) >= 0));
				this.filteredData = filteredDataByTags;
			}
			// filter by keyword, for now this only affects the name attribute of each data
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
