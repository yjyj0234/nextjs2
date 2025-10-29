async function getPost(postId:string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
        {next: {revalidate: 10}} //캐시된 데이터를 일정 시간 간격으로 재검증(초단위)
    );

    if(!res.ok){
        //가장 가까이에 있는 error.js activated
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;

}

const PostDetailPage = async ({params}:any) => {
    const { id } = await params;
    const post = await getPost(id); //next.js 15이후 params = Promise 라서 .id 접근하면 에러남
  return (
    <div>
        <h1>posts/{post.id}</h1>
        <div>
            <h3>{post.title}</h3>
            <p>{post.created}</p>
        </div>
    </div>
  )
}

export default PostDetailPage