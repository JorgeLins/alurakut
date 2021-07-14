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
  const [comunidades, setComunidades] = React.useState([{
    id: '46184351685415478534157',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  },
  {
    id: '46184357285415478534157',
    title: 'Foda é meu pai. Eu sou fodinha',
    image: 'https://scontent.ffor41-1.fna.fbcdn.net/v/t1.18169-0/cp0/e15/q65/c11.0.64.64a/p64x64/422510_330626123627377_424165018_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_eui2=AeFmdx-F4d-zHzzq3ENlrWKFQMHwGxnV6QJAwfAbGdXpAqEYXKb_G8JbNf5R7oxSfSJ1ComnRT_r39u5NtIlg4m5&_nc_ohc=HD8uPep3wFIAX_CBcWF&tn=-W63MigegE6bgUU7&_nc_ht=scontent.ffor41-1.fna&oh=7d008ecfe3bcf6a473b77d15332da2fe&oe=60F4E3D1'
  },
  {
    id: '35858544618415478534157',
    title: 'Eu odeio segunda-feira',
    image: 'https://img10.orkut.br.com/community/f5578eb70f74221d1488a9d47b1fd250.JPG'
  }
]);
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
              Bem Vindo (a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString(),
                  titulo: dadosDoForm.get('title'),
                  imagem: dadosDoForm.get('image')
                }
                const comunidadesAtualizadas = [...comunidades, comunidade]
                setComunidades(comunidadesAtualizadas)

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
                      <a href={`/users/${itemAtual.title}`}>
                        { <img src={itemAtual.image}/> }
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
