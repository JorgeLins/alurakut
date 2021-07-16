import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    
    if (request.method == 'POST'){
        const TOKEN = '44da17f750bbbe3c34bf8cc6cda190'
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({ 
            itemType: "968030",
            ...request.body,
            // title: 'TESTANDo',
            // imageUrl: 'http://via.placeholder.com/300',
            // creatorSlug:'Jorge Lins',
        })
    
        console.log(TOKEN)
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }
    
    response.status(404).json({
        message: 'Ainda não encontramos nada no GET'
    })

}