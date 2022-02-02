import React, {Component} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component{
    static defaultProps = {
        country:'in',
        pageSize:6,
        category: 'general'
    }
    static propTypes = {
        counters: PropTypes.string,
        pages: PropTypes.number,
        category: PropTypes.string
    }
    CapsFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles :[],
            loading:true,
            page :1,
            totalResults:0
        }
        document.title = `${this.CapsFirstLetter(this.props.category)} - NewsFeed`;
    }

    async updateArticle(){
      const  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0219494c3d64cb4a01502789eb74f5e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json()
      this.setState({
          articles:parseData.articles,
          totalResults:parseData.totalResults,
          loading:false
        });
    }

  async componentDidMount() {
      this.updateArticle()
    }

    // fetchMoreData = async () =>{
    //     this.setState({page: this.state.page + 1}
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //     articles: this.state.articles.concat{parsedData.articles},
    //     totalResults: parsedData.totalResults,
    //     loading: false,
    //     })
    //     };
        
    

    render() {
        return (
            <>
                <h2 className="text-center">NewsCast - Top <span style = {{color: 'red'}}>{this.CapsFirstLetter(this.props.category)}</span> Headlines</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >   

                <div className="container">
                    <div className="row"  >
                        {!this.state.loading && this.state.articles.map((element)=>{
                         return  <div className="col-md-4"  key= {element.url} >
                                    <NewsItem 
                                        title= {element.title?element.title:" "}
                                        description={element.description?element.description:''} 
                                        imageUrl ={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                        })}
                    </div> 
                </div>
             </InfiniteScroll>
            </>
        )
   }
}  





