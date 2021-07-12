import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar(propriedades){
  return(
    <Box>
      <img src= {`https://github.com/${propriedades.githubUSer}.png`} style={{ borderRadius: '8px' }}  />
    </Box>
  )
}


export default function Home() {
  const githubUSer = 'jorgelins'
  const amigos = ['yagocam', 'BernardErick', 'italoteix', 'marcobrunodev', 'omariosouto']

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
        </div>

        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({amigos.length})
            </h2>

            <ul>

              {amigos.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key= {itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Box>
            Comunidades
          </Box>
        </div>
    </MainGrid>
  </>
  )
}
