import React from 'react'
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutMenuProfileSidebar, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar(propriedades){
  return(
    <Box>
      <img src= {`https://github.com/${propriedades.githubUSer}.png`} style={{ borderRadius: '8px' }}  />
      <hr></hr>

      <p>
        <a className='boxLink' href={`https://github.com/${propriedades.githubUSer}`}>
          @{propriedades.githubUSer}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className='smallTitle'>
      {propriedades.title} ({propriedades.items.length})
    </h2>

    <ul>
      {/* {seguidores.map((itemAtual) => {
        return (
          <li key= {itemAtual}>
            <a href={`/users/${itemAtual}`}>
              <img src={`https://github.com/${itemAtual}.png`}/>
              <span>{itemAtual}</span>
            </a>
          </li>
        )
      })} */}
    </ul>
  </ProfileRelationsBoxWrapper>

  )
}


export default function Home() {
  const [comunidades, setComunidades] = React.useState([]);
  const githubUSer = 'jorgelins';
  // const comunidade = ['AluraKut'];
  const amigos = ['yagocam', 'BernardErick', 'italoteix', 'marcobrunodev', 'omariosouto']

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function() {
    fetch("https://api.github.com/users/JorgeLins/followers")
    .then(function(repostaDoServidor) {
      return repostaDoServidor.json();
    })
    .then(function(repostaCompleta) {
      setSeguidores(repostaCompleta);
    })


    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'eb16627374c7988158a993295d6445',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDoDato = respostaCompleta.data.allCommunities

      setComunidades(comunidadesDoDato)
      console.log(respostaCompleta)
    })

  }, [])

  return (
    <>
      <AlurakutMenu />
      <MainGrid>

        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUSer = {githubUSer} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUSer,
                }

                fetch('/api/comunidades', {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(comunidade),
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                })



            }}>

              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label='Qual vai ser o nome da sua comunidade?' 
                type='text'/>
              </div>

              <div>
                <input placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label='Coloque uma URL para usarmos de capa' />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>

        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title='Seguidores' items={seguidores} />
       
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({amigos.length})
            </h2>

            <ul>
              {amigos.map((itemAtual) => {
                return (
                  <li key= {itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
              Comunidades ({comunidades.length})
            </h2>
            <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>
        </div>
    </MainGrid>
  </>
  )
}
