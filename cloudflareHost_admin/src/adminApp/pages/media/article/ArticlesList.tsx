
import type { Article, ArticleProp } from "../../../component/interface/interface";
import { useDeleteResource } from "../../../services/queries/mutations/useDeleteResource";
import { useFetchResources } from "../../../services/queries/query/useFetchResources";
import AdminError from "../../adminError/AdminError";
import AdminLoader from "../../adminLoader/AdminLoader";
import EmptyState from "../../emptyState/EmptyState";
import ArticlesCard from "./ArticlesCard";

const ArticlesList = () => {
  const { data, isLoading, isError } = useFetchResources("articles");


  const magazines:ArticleProp[] = data?.map((item: Article) => ({
    id: item.id,
    name: item.MagazineName_ka,
    cover: item.image_url,
    title: item.title_ka,
    subtitle: item.subtitle_ka,
    date: new Date(item.created_at).toLocaleDateString(),
    price: "€ 00.00",
    description_ka: item.description_ka,
    link: item.article_url,
    barcode: "978-000000-00-0",
  })) ?? []

  const {mutate} = useDeleteResource("articles");

  const deleteResource = (id:number) => {
    mutate(id)
  }


  if (isLoading) return <AdminLoader/>
  if (isError) return <AdminError/>
  if (magazines.length === 0) return <EmptyState message="ბეჭდური მედია ჯერ არ არის" />

  return (
    <>
      <div className="px-10 py-32 2xl:py-10 2xl:pb-22">
      <div className="relative max-w-7xl mx-auto px-6 text-center mb-10 z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 ">
          <span className="text-red-500 ">სტატიები</span>
        </h2>
        <p className="text-gray-100 text-lg max-w-3xl mx-auto leading-relaxed">
          იხილეთ ყველა სტატია აქ
        </p>
        <div className="mt-6 w-24 h-1 mx-auto bg-red-500 rounded-full" />
      </div>
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {magazines.map((mag) => (
            <div key={mag.id} className="snap-start">
              <ArticlesCard magazine={mag} deleteResource={deleteResource}/>
            </div>
          ))}
        </div>
      )}
    </div>

    </>
    
  );
};

export default ArticlesList;